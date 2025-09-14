'use client'

import { Autocomplete, AutocompleteProps } from "@mui/material"
import { TextFieldBase, TextFiledControlBase } from "../textfield/textfield.comp"
import { useEffect, useState } from "react";
import { Prosto_One } from "next/font/google";
import { validRequire } from "@/base/utils/func";

type AutocompleteBaseProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
interface SelectBaseProps<T, Multiple extends boolean | undefined = false> {
  selectProps: AutocompleteBaseProps<T, Multiple, true, false>
  label?: string;
  name: string
  default?: any;
  required?: boolean
  values?: (value: any) => void
}
export function AutocompleteBase<T, Multiple extends boolean | undefined = false>(props: SelectBaseProps<T, Multiple>) {
  const [selected, setSelected] = useState<any>();
const [helperRequired, setHelperRequired] = useState("");
  useEffect(() => {
    if (props.default) setSelected(props.default);
  }, [props.default]);
  const handleOnBlur = (e: any) => {
    if (props.values) props.values(selected)
    }
  return (<>
    <Autocomplete
      fullWidth
      {...props.selectProps}
      sx={{
        "& .MuiButtonBase-root": {
          height: '1.75rem  !important',
          padding: '2px',
          mr: '2px'
        },
        "& .MuiInputBase-root": {
          height: props?.selectProps.multiple ? '3rem  !important' : '2.25rem  !important',
        },

      }}
      value={selected || props.selectProps.defaultValue || (props.selectProps.multiple ? [] : null)}
      onChange={(e, newValue: any, reason) => {
        if (!newValue?.length) setHelperRequired('*Required field')
          else setHelperRequired('')
        setSelected(newValue)
      }}
      onBlur={handleOnBlur}
      renderInput={(params) => <TextFiledControlBase
        inputProps={{ ...params, }}
        name={props.name}
        errorMessage={props.required ? helperRequired : ''}
        label={props.label} />}
    />

  </>)
}