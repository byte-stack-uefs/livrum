import PublicFooter from "../app/components/Footer";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: PublicFooter,
    tags: ["autodocs"],
    title: "PublicFooter",
} satisfies Meta<typeof PublicFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Footer: Story = {};
