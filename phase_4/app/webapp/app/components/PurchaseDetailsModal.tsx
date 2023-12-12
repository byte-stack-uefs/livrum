import { Box, Button, Container, Grid, Modal, Stack, Typography } from "@mui/material";
import PurchaseItem from "../interfaces/PurchaseItem";
import React from "react";
import Divider from "./Divider";


type PurchaseItemProps = {
    purchaseItem: PurchaseItem;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
  
const PurchaseDetailsModalHeader: React.FC<PurchaseItemProps> = ({purchaseItem}) =>{
    return(
        <Box sx={{boxShadow: 3, backgroundColor:'#F4F2F2', textAlign:"center", fontSize:22, fontWeight: 'bold'}}>
            Compra: <Grid item sx={{ fontWeight: 'normal' }}></Grid>{purchaseItem.id}
        </Box>
    );
}

const DisplayModal: React.FC<PurchaseItemProps> = ({purchaseItem}) =>{
    return(
        <p></p>
    );
}

type PurchaseDetailsModalProps = {
    openheimer: boolean;
    purchaseItem: PurchaseItem;
}

const PurchaseDetailsModal: React.FC<PurchaseDetailsModalProps> = ({openheimer,purchaseItem}) =>{
    const [open, setOpen] = React.useState(openheimer);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Container>            
                <Grid container sx={{backgroundColor:'#FFF'}}>
                        <Grid item xs={12}>
                            <PurchaseDetailsModalHeader purchaseItem={purchaseItem}></PurchaseDetailsModalHeader>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack sx={{fontSize:22, fontWeight: 'bold' }}>
                                <Grid item xs={12} sx={{fontWeight: 'normal' }}>{purchaseItem.date}</Grid>
                                <Grid item xs={12} sx={{fontWeight: 'normal' }}>{purchaseItem.price}</Grid>
                                <Grid item xs={12} sx={{fontWeight: 'normal' }}>{purchaseItem.paymentMethod}</Grid>
                                <Grid item xs={12} sx={{fontWeight: 'normal' }}>{purchaseItem.books.length}</Grid>
                                <Grid item xs={12} sx={{fontWeight: 'normal' }}>{purchaseItem.status}</Grid>
                            </Stack>
                        </Grid>
                        <Divider height={4} width={"100%"} style={{}} />
                        <Grid item  sx={{fontWeight: 'bold' }}> Ebooks adquiridos</Grid>
                        
                </Grid>
            </Container>  
        </Modal>
      </div>
    );}

export default PurchaseDetailsModal;
