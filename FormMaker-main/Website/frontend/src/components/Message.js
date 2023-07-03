import Stack from '@mui/material/Stack';

import Alert from '@mui/material/Alert';

const Message = ({ type = 'info', children }) => {
  return (
    <Stack sx={{ mt: 3 }}>
      <Alert variant="filled" severity={type}>
        {children}
      </Alert>
    </Stack>
  );
};

export default Message;
