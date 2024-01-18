import { CSSProperties } from "react";
import { useRouter } from "next/navigation";

export default function LivrumLink({ href, children, style }: { href: string; children: React.ReactNode; style?: CSSProperties }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(href);
    };

    return (
        <>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
                style={{ ...style, textDecoration: "none" }}
            >
                {children}
            </a>
        </>
    );
}
