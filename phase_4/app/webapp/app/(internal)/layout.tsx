import React from "react";
import InternalLayout from "../components/layouts/InternalLayout";


export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <InternalLayout>
            {children}
        </InternalLayout>
    );
}