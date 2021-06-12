import { Form, Formik, Field } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { FilterType } from "../../redux/usersReducer";
import { getUsersFilter } from "../../redux/usersSelectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null";

type FormType = {
  term: string,
  friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);

  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    } 
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik 
      enableReinitialize 
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}} 
      validate={usersSearchFormValidate} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
