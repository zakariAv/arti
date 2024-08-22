import { memo } from 'react'
import { Field } from "formik";
const InputContainer = ({ id, type = "text", label, name }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="text-[10px] sm:text-xs font-semibold md:text-sm text-left">
        {label}
      </label>
      <Field
        type={type}
        id={id}
        name={name}
        className="rounded-md caret-blue-500 border-2 text-[10px] sm:text-xs md:text-base border-slate-500 px-1  dark:bg-transparent py-1 focus:border-blue-500 focus:outline-none sm:p-1 lg:p-1.5"
        autoComplete={type === "password" ? 'off' : 'on'}
      />
    </div>
  );
};

export default memo(InputContainer);
