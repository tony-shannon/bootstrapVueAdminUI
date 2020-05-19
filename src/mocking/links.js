var patientSelectedLinks = [
    {
        title: 'Patients',
        to: {name: 'patients'},
    },
    {
        title: 'Diagnosis',
        to: {
            name: 'diagnosis',
            params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'}
        }
    },
    {
        title: 'Medications',
        to: {
            name: 'medications',
            params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'}
        }
    },
    {
        title: 'Adverse Reactions',
        to: {
            name: 'advreaction',
            params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'}
        }
    }

];
export  const  PATIENT_IS_SELECTED_LINKS = patientSelectedLinks;


var patientNotSelectedLinks = [
    {
        title: 'Centre',
        to: {name: 'home'},
    },
    {
        title: 'Patients',
        to: { name: 'patients' },
    },
    {
        title: 'Queries',
        to: {name: 'home'},
    }
]

export const PATIENT_NOT_SELECTED_LINKS = patientNotSelectedLinks;
