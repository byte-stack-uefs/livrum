import TopBar from "../app/components/TopBar";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "TopBar",
    component: TopBar,
    tags: ["autodocs"],
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Top: Story = {};
