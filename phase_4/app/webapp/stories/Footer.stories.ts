import Footer from "../app/components/Footer";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: Footer,
    tags: ["autodocs"],
    title: "PublicFooter",
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const F: Story = {};
