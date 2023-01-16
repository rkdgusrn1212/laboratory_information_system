import PatientPickerInput from './PatientPickerInput';
import PatientPickerList from './PatientPickerList';
const dummyPatient = [
  {
    no: 'P0001',
    name: '강현구',
    rnn: '951111-1234567',
    birth: new Date('1995-11-11'),
    male: true,
    image: null,
  },
  {
    no: 'P0002',
    name: '류진',
    rnn: '960808-2134567',
    birth: new Date('1996-08-08'),
    male: false,
    image: null,
  },
  {
    no: 'P0003',
    name: '김동신',
    rnn: '960303-1313131',
    birth: new Date('1996-03-03'),
    male: true,
    image: null,
  },
];

const PatientPicker = () => {
  return (
    <>
      <PatientPickerInput />
      <PatientPickerList data={dummyPatient} />
    </>
  );
};
export default PatientPicker;
