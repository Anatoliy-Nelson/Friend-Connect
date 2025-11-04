import { FieldValidatorType } from 'utils/validators/validators'
import React, { FC } from 'react'
import { Field, WrappedFieldProps } from 'redux-form'

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: FieldValidatorType[],
                                                         component: FC<WrappedFieldProps>,
                                                         props = {},
                                                         textInput = '') {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            />
            {textInput}
        </div>
    )
}