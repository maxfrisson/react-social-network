import styles from "./FormsControls.module.css";

const FormControl = (props) => {
  const hasError = props.meta.touched && props.meta.error;
  return (
    <div className={styles.formsControls + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      {hasError && (
        <div>
          <span>{props.meta.error}</span>
        </div>
      )}
    </div>
  );
};

export const Textarea = (props) => {
  return (
    <FormControl {...props}>
      <textarea {...props.input} {...props} />
    </FormControl>
  );
};

export const Input = (props) => {
  return (
    <FormControl {...props}>
      <input {...props.input} {...props} />
    </FormControl>
  );
};
