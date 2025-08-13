export function NewsLetterInput(
    props: React.InputHTMLAttributes<HTMLInputElement>
) {
    return (
        <input
            {...props}
            className="box-border h-[50px] w-full rounded-[30px] border border-black bg-transparent text-center text-base font-normal tracking-[2px] text-black md:max-w-[338px]"
        />
    );
}
