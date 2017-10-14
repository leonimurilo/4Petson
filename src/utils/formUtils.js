import React from 'react';

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
