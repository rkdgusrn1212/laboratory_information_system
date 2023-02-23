import { ChangeEvent, forwardRef, useCallback, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Collapse from '@mui/material/Collapse';

import { useLazyReadBehaviorListQuery } from '../../services/behaviorApi';
import {
  Behavior,
  SpecimenContainer,
  SpecimenType,
} from '../../services/types';
import { useLazyReadSpecimenTypeListQuery } from '../../services/specimenTypeApi';
import { useLazyReadSpecimenContainerListQuery } from '../../services/specimenContainerApi';
import {
  useCreatePrescriptionMutation,
  isCreatePrescriptionError,
} from '../../services/prescriptionApi';
import { useUpdateTestPrescriptionMutation } from '../../services/testPrescriptionApi';
import { SelectChangeEvent } from '@mui/material';
import TestFieldSelectInput from '../common/TestFieldSelectInput';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [testFieldCode, setTestFieldCode] = useState('');
  const [testAmount, setTestAmount] = useState(0);
  const [readBehaviorList, readBehaviorListResult] =
    useLazyReadBehaviorListQuery({ pollingInterval: 20000 });
  const [readSpecimenTypeList, readSpecimenTypeListResult] =
    useLazyReadSpecimenTypeListQuery({ pollingInterval: 20000 });
  const [readSpecimenContainerList, readSpecimenContainerListResult] =
    useLazyReadSpecimenContainerListQuery({ pollingInterval: 20000 });

  const [createPrescription, createPrescriptionResult] =
    useCreatePrescriptionMutation();
  const [updateTestPrescription, updateTestPrescriptionResult] =
    useUpdateTestPrescriptionMutation();

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
      setPrescriptionClassification('CP');
    } else {
      setPrescriptionClassification('');
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

  const handleDialogClose = () => {
    setOpen(false);
  };

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
      behaviorCode: behaviorCode.length > 0 ? behaviorCode : null,
      prescriptionName,
      prescriptionComment: comment.length > 0 ? comment : null,
    })
      .unwrap()
      .then(() => {
        updateTestPrescription({
          prescriptionCode,
          specimenContainerCode: specimenContainer
            ? specimenContainer.specimenContainerCode
            : null,
          specimenTypeCode: specimenType ? specimenType.specimenTypeCode : null,
          testPrescriptionUnit: unit.length > 0 ? unit : null,
          testPrescriptionReference: reference.length > 0 ? reference : null,
          testFieldCode: testFieldCode.length > 0 ? testFieldCode : null,
          testPrescriptionAmount: testAmount,
        })
          .unwrap()
          .then(() => {
            setError(null);
          })
          .catch(() => {
            setError('새 처방 등록을 실패했습니다.');
          });
      })
      .catch((data) => {
        if (
          isCreatePrescriptionError(data) &&
          data.data.code === 'DUPLICATED'
        ) {
          setError('이미 처방코드가 존재합니다');
          setOpen(true);
        } else {
          setError('새 처방 등록을 실패했습니다.');
        }
      });
  };

  const handleTestFieldChange = (event: SelectChangeEvent) => {
    setTestFieldCode(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTestAmount(parseInt(event.target.value));
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

      <TextField
        fullWidth
        sx={{ mt: 1 }}
        size="small"
        label="메모"
        value={comment}
        onChange={handleCommentChange}
        autoComplete="new-password"
      />
      <Collapse in={prescriptionClassfication === 'CP'}>
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
                    {option.specimenContainerCode}{' '}
                    {option.specimenContainerName}
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
        <Box display="flex" gap={1} mt={1} alignItems="center">
          <Box width={100}>
            <TextField
              fullWidth
              size="small"
              label="검체량"
              type="number"
              value={testAmount}
              onChange={handleAmountChange}
              autoComplete="new-password"
            />
          </Box>
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
          <TestFieldSelectInput
            label="검사분류"
            value={testFieldCode}
            fullWidth
            onChange={handleTestFieldChange}
            size="small"
            variant="outlined"
          />
        </Box>
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          size="small"
          label="참고치"
          value={reference}
          onChange={handleReferenceChange}
          autoComplete="new-password"
        />
      </Collapse>
      <Box display="flex" width="100%" justifyContent="flex-end" mt={1}>
        {updateTestPrescriptionResult.isSuccess && (
          <Alert severity="success" sx={{ flexGrow: 1, mx: 1 }}>
            등록되었습니다.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ flexGrow: 1, mx: 1 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={
              prescriptionCode.length < 1 ||
              prescriptionName.length < 1 ||
              updateTestPrescriptionResult.isLoading
            }
            color="secondary"
          >
            등록
          </Button>
          {(createPrescriptionResult.isLoading ||
            updateTestPrescriptionResult.isLoading) && (
            <CircularProgress
              size={24}
              sx={{
                color: '',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
      >
        <DialogTitle>{'동일한 처방코드가 존재합니다'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            기존 처방을 수정하는 페이지로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>아니오</Button>
          <Button onClick={handleDialogClose}>네</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export default SimplePrescriptionForm;
