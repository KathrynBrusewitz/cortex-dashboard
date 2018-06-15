# Link Styling

Links must not point to `#`, or else a `jsx-a11y/href-no-hash` warning will trigger.

When you want to retain the styling of a link but not necessarily route to another page, use `<a href={null}></a>`, not `<a href="#"></a>`. Otherwise use a button.

In some contexts, a button may be visually too solid and heavy. For example, clicking this link will mount a confirmation modal, but it won't navigate away from the page:

```
<Popconfirm
  title="Are you sure delete this event?"
  onConfirm={() => {
    this.props.deleteEvent(record._id);
  }}
  onCancel={() => {}}
  okText="Yes"
  cancelText="No"
>
  <a href={null}>Delete</a>
</Popconfirm>
```

Preserving link styling indicates to users that it's clickable, while enabling it to stay in-line with or within other text.
