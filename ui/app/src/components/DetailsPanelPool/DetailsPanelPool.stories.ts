import DetailsPanelPool from "./DetailsPanelPool.vue";

export default {
  title: "DetailsPanelPool",
  component: DetailsPanelPool,
};

const Template = (args: any) => ({
  props: [""],
  components: { DetailsPanelPool },
  setup() {
    return { args };
  },
  template:
    "<div><DetailsPanelPool><span>This is an example title</span></DetailsPanelPool></div>",
});

export const Basic = Template.bind({});
Basic.args = {};
