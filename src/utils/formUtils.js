import React from 'react';

export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validateCPF(cpf) {
    let re = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return re.test(cpf);
}

export function renderField(field){
    //gets field.meta, field.meta.touched and field.meta.error
    const {meta: {touched, error}} = field;
    const className = `${touched && error ? "has-danger" : ""}`;
    return (
      <input
          placeholder={field.label}
          className={`textInput ${className}`}
          type={field.type}
          {...field.input}
      />
    );
}
