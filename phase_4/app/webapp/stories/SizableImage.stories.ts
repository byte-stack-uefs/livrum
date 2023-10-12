import SizableImage from "../app/components/SizableImage";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "SizableImage",
    component: SizableImage,
    tags: ["autodocs"],
} satisfies Meta<typeof SizableImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizable: Story = {
    args: {
        src: require("/public/livrum.png"),
        alt: "Livrum Logo",
    },
};
