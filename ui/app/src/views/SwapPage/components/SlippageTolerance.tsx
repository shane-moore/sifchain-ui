import { Button } from "@/components/Button/Button";
import { shouldPreventInput } from "../../../utils/shouldPreventInput";

export const SlippageTolerance = (props: {
  slippage: string;
  onUpdate: (val: string) => any;
}) => {
  return (
    <div class="flex items-center justify-center flex-row mt-[10px]">
      <div class="inline-flex mr-[10px] items-center">
        Slippage
        <Button.InlineHelp>
          Your transaction will revert if the price changes unfavorably by more
          than this percentage.
        </Button.InlineHelp>
      </div>
      <div class="flex flex-row items-center justify-center">
        {["0.5", "1.0", "1.5"].map((opt) => {
          return (
            <button
              onClick={(e) => {
                props.onUpdate(opt);
              }}
              class={`transition-all box-border text-white text-md mr-[7px] font-mono font-medium w-[57px] h-[33px] border-solid border-[1px] border-transparent rounded-[4px] ${
                +opt === +props.slippage
                  ? "bg-accent-gradient"
                  : "bg-gray-input border-gray-input_outline bg-gradient-to-b from-transparent to-transparent"
              }`}
            >
              {opt}%
            </button>
          );
        })}
      </div>
      <div class="flex flex-row items-center flex-nowrap box-border border border-solid border-transparent focus-within:border-white text-white font-mono group text-[20px] w-full bg-gray-input rounded-[4px]">
        <input
          type="text"
          class="px-[10px] pr-0 h-[31px] w-full align-middle bg-transparent outline-none font-mono text-right text-md font-semibold"
          value={props.slippage}
          onBeforeInput={(e: InputEvent): void => {
            const target = e.target as HTMLInputElement;
            // prevent next keystroke from being added to e.target.value if the max digits before or after the decimal place are reached
            if (typeof target.selectionStart === "number" && e.data) {
              shouldPreventInput(
                target.value,
                target.selectionStart,
                e.data,
                3,
                5,
              )
                ? e.preventDefault()
                : null;
            }
          }}
          onInput={(e) => {
            props.onUpdate((e.target as HTMLInputElement).value);
          }}
        />
        <div class="pr-[10px] pointer-events-none select-none">%</div>
      </div>
    </div>
  );
};
