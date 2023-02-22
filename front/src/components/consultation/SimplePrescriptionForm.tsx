import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { useLazyReadBehaviorListQuery } from '../../services/behaviorApi';
import {
  Behavior,
  SpecimenContainer,
  SpecimenType,
} from '../../services/types';
import { useLazyReadSpecimenTypeListQuery } from '../../services/specimenTypeApi';
import { useLazyReadSpecimenContainerListQuery } from '../../services/specimenContainerApi';
import { Button } from '@mui/material';
import { useCreatePrescriptionMutation } from '../../services/prescriptionApi';

const SimplePrescriptionForm: React.FC = () => {
  const [prescriptionCode, setPrescriptionCode] = useState('');
  const [prescriptionName, setPrescriptionName] = useState('');
  const [prescriptionClassfication, setPrescriptionClassification] =
    useState('');
  const [behaviorCode, setBehaviorCode] = useState('');
  const [specimenTypeName, setSpecimenTypeName] = useState('');
  const [specimenContainerName, setSpecimenContainerName] = useState('');
  const [specimenType, setSpecimenType] = useState<SpecimenType | null>(null);
  const [specimenContainer, setSpecimenContainer] =
    useState<SpecimenContainer | null>(null);
  const [comment, setComment] = useState('');
  const [unit, setUnit] = useState('');
  const [reference, setReference] = useState('');
  const [readBehaviorList, readBehaviorListResult] =
    useLazyReadBehaviorListQuery({ pollingInterval: 20000 });
  const [readSpecimenTypeList, readSpecimenTypeListResult] =
    useLazyReadSpecimenTypeListQuery({ pollingInterval: 20000 });
  const [readSpecimenContainerList, readSpecimenContainerListResult] =
    useLazyReadSpecimenContainerListQuery({ pollingInterval: 20000 });

  const [createPrescription, createPrescriptionState] =
    useCreatePrescriptionMutation();

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };
  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReference(event.target.value);
  };
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
    if (value && value.behaviorCode.charAt(0) === 'D') {
      setPrescriptionClassification(value ? 'CP' : '');
    }
  };

  const handleSpecimenTypeChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: SpecimenType | null,
  ) => {
    setSpecimenType(value);
  };

  const handleSpecimenTypeCodeChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: string) => {
      setSpecimenTypeName(value);
      readSpecimenTypeList({
        specimenTypeNameKey: value,
        pageStart: 0,
        pageSize: 10,
      });
    },
    [readSpecimenTypeList],
  );

  const handleSpecimenContainerChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: SpecimenContainer | null,
  ) => {
    setSpecimenContainer(value);
  };

  const handleSpecimenContainerCodeChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: string) => {
      setSpecimenContainerName(value);
      readSpecimenContainerList({
        specimenContainerNameKey: value,
        pageStart: 0,
        pageSize: 10,
      });
    },
    [readSpecimenContainerList],
  );

  const behaviorOptions: readonly Behavior[] = useMemo(
    () => (readBehaviorListResult.data ? readBehaviorListResult.data : []),
    [readBehaviorListResult.data],
  );

  const specimenContainerOptions: readonly SpecimenContainer[] = useMemo(
    () =>
      readSpecimenContainerListResult.data
        ? readSpecimenContainerListResult.data
        : [],
    [readSpecimenContainerListResult.data],
  );

  const specimenTypeOptions: readonly SpecimenType[] = useMemo(
    () =>
      readSpecimenTypeListResult.data ? readSpecimenTypeListResult.data : [],
    [readSpecimenTypeListResult.data],
  );

  const handleClick = () => {
    createPrescription({
      prescriptionCode,
      prescriptionName,
      prescriptionComment: comment,
    });
  };
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
        <Box width={100}>
          <TextField
            fullWidth
            label="처방코드"
            size="small"
            value={prescriptionCode}
            autoComplete="new-password"
            onChange={handlePrescriptionCodeChange}
          />
        </Box>
        <Box flexGrow={1} width={100}>
          <TextField
            fullWidth
            label="처방명"
            value={prescriptionName}
            onChange={handlePrescriptionNameChange}
            size="small"
            autoComplete="new-password"
          />
        </Box>
        <Box width={60}>
          <TextField
            fullWidth
            label="분류"
            value={prescriptionClassfication}
            onChange={handlePrescriptionClassificationChange}
            size="small"
            autoComplete="new-password"
            disabled
          />
        </Box>
      </Box>
      <Box mt={1} display="flex" gap={1}>
        <Box width={100} flexGrow={1}>
          <Autocomplete
            fullWidth
            options={specimenTypeOptions}
            autoHighlight
            inputValue={specimenTypeName}
            onInputChange={handleSpecimenTypeCodeChange}
            isOptionEqualToValue={(option, value) =>
              option.specimenTypeCode === value.specimenTypeCode
            }
            onChange={handleSpecimenTypeChange}
            getOptionLabel={(option) => option.specimenTypeName}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Typography fontSize="12px">
                  {option.specimenTypeCode} {option.specimenTypeName}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label="검체 선택"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        </Box>
        <Box width={100} flexGrow={1}>
          <Autocomplete
            fullWidth
            options={specimenContainerOptions}
            autoHighlight
            inputValue={specimenContainerName}
            onInputChange={handleSpecimenContainerCodeChange}
            isOptionEqualToValue={(option, value) =>
              option.specimenContainerCode === value.specimenContainerCode
            }
            onChange={handleSpecimenContainerChange}
            getOptionLabel={(option) => option.specimenContainerName}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Typography fontSize="12px">
                  {option.specimenContainerCode} {option.specimenContainerName}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label="용기 선택"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Box display="flex" gap={1} mt={1}>
        <Box width={100}>
          <TextField
            fullWidth
            size="small"
            label="단위"
            value={unit}
            onChange={handleUnitChange}
            autoComplete="new-password"
          />
        </Box>
        <TextField
          fullWidth
          size="small"
          label="참고치"
          value={reference}
          onChange={handleReferenceChange}
          autoComplete="new-password"
        />
      </Box>
      <TextField
        fullWidth
        sx={{ mt: 1 }}
        size="small"
        label="메모"
        value={comment}
        onChange={handleCommentChange}
        autoComplete="new-password"
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleClick}
      >
        등록
      </Button>
    </Paper>
  );
};
export default SimplePrescriptionForm;
