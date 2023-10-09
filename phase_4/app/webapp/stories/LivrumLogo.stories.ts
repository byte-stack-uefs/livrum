import LivrumLogo from "../app/components/LivrumLogo";

import type { Meta, StoryObj } from '@storybook/react';


const meta = {
    title: 'Logo',
    component: LivrumLogo,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>;

export const Logo: Story = {}