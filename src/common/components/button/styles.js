const styles = (
  theme,
  { shade = 500, palette = "primary", textAlign = "center" }
) => {
  const backgroundColor = theme.palette[palette][shade];
  return {
    button: {
      backgroundColor
    },
    text: {
      textAlign,
      color: theme.palette.text[palette]
    }
  };
};

export default styles;
