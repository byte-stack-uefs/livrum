import { Meta, StoryObj } from "@storybook/react";

import Book from "../app/interfaces/Book";
import EbookCard from "../app/components/EbookCard";

const meta = {
    component: EbookCard,
    title: "Ebook Card",
    tags: ["autodocs"],
} satisfies Meta<typeof EbookCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ebook: Story = {
    args: {
        book: {
            author: "Autor",
            title: "Book's Title",
            releaseDate: "20/10/2015",
        },
    },
};
