import { Meta, StoryObj } from "@storybook/react";

import LivrumLogo from "../app/components/LivrumLogo";

const meta = {
    component: LivrumLogo,
    title: "Livrum Logo",
    tags: ["autodocs"],
} satisfies Meta<typeof LivrumLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Logo: Story = {};
