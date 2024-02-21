"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import Ebook, { EbookResponse } from "@/app/interfaces/Ebook";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CloudDownload, CheckCircle, ReportProblem } from "@mui/icons-material";
import { Alert, Box, Button, List, ListItem, Pagination, Stack, Typography } from "@mui/material";
import useRequest from "@/app/services/requester";
import { useUser } from "@/app/context";

type DynamicDownloadButtonProps = {
    isAvailable: boolean;
    onClick: () => void;
};

const DynamicDownloadButton: React.FC<DynamicDownloadButtonProps> = ({ isAvailable, onClick }) => {
    return (
        <Button
            onClick={() => {
                onClick();
            }}
            disabled={!isAvailable}
            variant="contained"
            startIcon={<CloudDownload />}
        >
            Baixar
        </Button>
    );
};

function ClientLibraryContainerHeader() {
    return (
        <Grid xs={12}>
            <Grid xs={12} sx={{ fontSize: 28 }}>
                <Typography variant="h3">Minha Biblioteca</Typography>
            </Grid>
            <Grid xs={12}>
                <Divider height={4} width={"10%"} />
            </Grid>
        </Grid>
    );
}

function ClientLibraryBookContainer() {
    const { user } = useUser();
    const [fetched, setFetched] = useState(false);
    const [books, setBooks] = useState<Ebook[]>([]);
    const requester = useRequest();

    const fetchClientLibrary = async () => {
        if (!fetched) {
            const { data } = await requester.get<EbookResponse>("/ebook/userLibrary", {
                params: { idUsuario: user.idUsuario },
            });
            setBooks(data);
            console.log("BOOKS: ", data);
            if (!(books.length === 0)) {
                setFetched(true);
            }
        }
    };

    fetchClientLibrary();
    if (fetched) {
        return (
            <Grid container xs={12}>
                <List sx={{ width: "100%" }}>
                    {books.map((book) => (
                        <ListItem key={book.id}>
                            <InLibraryEbookCard ebook={book}></InLibraryEbookCard>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        );
    } else {
        return <></>;
    }
}

type InLibraryEbookCardProps = {
    ebook: Ebook;
};

const DisplayBookInfo: React.FC<InLibraryEbookCardProps> = ({ ebook }) => {
    const requester = useRequest();

    const [error, setError] = useState(false);

    function downloadEbook(id: number) {
        setError(false);
        requester
            .get("/ebook/download/" + id, { responseType: "blob" })
            .then((response) => {
                window.open(URL.createObjectURL(response.data));
            })
            .catch((err) => {
                setError(true);
            });
    }

    return (
        <Grid container sx={{ color: "dark.main" }} height="100%">
            <Grid xs={8}>
                <Grid xs={12} sx={{ fontSize: 22, fontWeight: "bold" }}>
                    {ebook.title}
                </Grid>
                <Grid xs={12}>{ebook.author}</Grid>
                <Grid xs={12}>{ebook.releaseYear}</Grid>
                <Grid xs={12}>Sinopse: {ebook.summary}</Grid>
                {!ebook.isAvailable && (
                    <Grid container mt={2} xs={12} sx={{ color: "error.main" }}>
                        <>
                            <Grid xs={1} alignSelf={"center"}>
                                <ReportProblem />
                            </Grid>
                            <Grid xs>
                                <Typography variant="caption">Este livro estará disponível para download assim que recebermos a confirmação do seu pagamento!</Typography>
                            </Grid>
                        </>
                    </Grid>
                )}
            </Grid>
            <Grid xs={4} sx={{ textAlign: "right" }}>
                <Stack direction="column" height="100%" justifyContent="space-between">
                    <div>
                        <DynamicDownloadButton
                            onClick={() => {
                                downloadEbook(ebook.id);
                            }}
                            isAvailable={ebook.isAvailable}
                        ></DynamicDownloadButton>
                    </div>
                    {error ? (
                        <div>
                            <Typography color="error.main">Ebook não disponível para download, por favor, tente novamente mais tarde</Typography>
                        </div>
                    ) : (
                        <></>
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
};

const InLibraryEbookCard: React.FC<InLibraryEbookCardProps> = ({ ebook }) => {
    return (
        <Grid container xs={12} sx={{ boxShadow: 3, backgroundColor: "#FFF", borderRadius: "16px", p: 2 }}>
            <Grid xs={2}>
                <Box>{ebook.cover ? <Image className="image-zoom" width={100} height={125} style={{ objectFit: "cover", borderRadius: "16px" }} alt={ebook.title} src={ebook.cover} /> : <></>}</Box>
            </Grid>
            <Grid xs={10}>
                <DisplayBookInfo ebook={ebook} />
            </Grid>
        </Grid>
    );
};

export default function Page() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} sx={{ backgroundColor: "secondary.main", borderRadius: "16px" }}>
                    <ClientLibraryContainerHeader></ClientLibraryContainerHeader>
                    <ClientLibraryBookContainer></ClientLibraryBookContainer>
                </Grid>
                <Grid xs={12}>
                    <>
                        <Grid container xs={12} justifyContent={"center"}>
                            <Pagination count={10} color="primary" shape="rounded" />
                        </Grid>
                    </>
                </Grid>
            </Grid>
        </>
    );
}
