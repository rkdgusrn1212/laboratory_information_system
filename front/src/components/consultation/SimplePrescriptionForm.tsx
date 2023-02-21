import { ChangeEvent, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { useLazyReadBehaviorListQuery } from '../../services/behaviorApi';
import { Behavior } from '../../services/types';

const SimplePrescriptionForm: React.FC = () => {
  const [prescriptionCode, setPrescriptionCode] = useState('');
  const [prescriptionName, setPrescriptionName] = useState('');
  const [prescriptionClassfication, setPrescriptionClassification] =
    useState('');
  const [behaviorCode, setBehaviorCode] = useState('');
  const [readBehaviorList, readBehaviorListResult] =
    useLazyReadBehaviorListQuery({ pollingInterval: 20000 });

  const handlePrescriptionCodeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPrescriptionCode(event.target.value);
  };

  const handlePrescriptionNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPrescriptionName(event.target.value);
  };

  const handlePrescriptionClassificationChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPrescriptionName(event.target.value);
  };

  const handleBehaviorCodeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setBehaviorCode(value);
    readBehaviorList({
      behaviorCodeKey: value,
      pageStart: 0,
      pageSize: 10,
    });
  };

  const handleBehaviorChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Behavior | null,
  ) => {
    setPrescriptionCode(value ? value.behaviorCode : '');
    setPrescriptionName(value ? value?.behaviorNameKr : '');
    setPrescriptionClassification(value ? 'CP' : '');
  };

  const behaviorOptions: readonly Behavior[] = readBehaviorListResult.data
    ? readBehaviorListResult.data
    : [];

  return (
    <Paper sx={{ height: '100%', py: 3, px: 1 }}>
      <Typography variant="h6" ml={2} mb={2}>
        간편 처방 등록
      </Typography>
      <Autocomplete
        fullWidth
        options={behaviorOptions}
        autoHighlight
        inputValue={behaviorCode}
        onInputChange={handleBehaviorCodeChange}
        isOptionEqualToValue={(option, value) =>
          option.behaviorCode === value.behaviorCode
        }
        onChange={handleBehaviorChange}
        getOptionLabel={(option) => option.behaviorCode}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <Typography fontSize="12px">
              {option.behaviorCode} {option.behaviorNameKr}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            size="small"
            label="청구코드"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />
      <Box display="flex" gap={1} mt={1}>
        <Box flexGrow={1} width={100}>
          <TextField
            label="처방코드"
            size="small"
            value={prescriptionCode}
            onChange={handlePrescriptionCodeChange}
          />
        </Box>
        <TextField
          label="처방명"
          value={prescriptionName}
          onChange={handlePrescriptionNameChange}
          size="small"
          fullWidth
        ></TextField>
        <TextField
          label="분류"
          value={prescriptionClassfication}
          onChange={handlePrescriptionClassificationChange}
          size="small"
          disabled
          sx={{ width: 100 }}
        />
      </Box>
    </Paper>
  );
};
export default SimplePrescriptionForm;
