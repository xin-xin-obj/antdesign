import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from ".";

export default {
  title: "Component/Button",
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button onClick={action("clicked")} {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: '按钮'
};
