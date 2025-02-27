import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDocument,
    fetchDocument,
    removeSelectedDocument,
    updateDocument,
    updateDocumentImage
} from "store/slices/documentsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const DocumentEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {document} = useAppSelector((state) => state.documents)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(document?.name)

    const [description, setDescription] = useState<string>(document?.description)

    const [prod_period, setProd_period] = useState<number>(document?.prod_period)

    const [replace_period, setReplace_period] = useState<number>()

    const [number_length, setNumber_length] = useState<number>()

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(document?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveDocument = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateDocumentImage({
                document_id: document.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            prod_period,
            replace_period,
            number_length
        }

        await dispatch(updateDocument({
            document_id: document.id,
            data
        }))

        navigate("/documents-table/")
    }

    useEffect(() => {
        dispatch(fetchDocument(id))
        return () => dispatch(removeSelectedDocument())
    }, []);

    useEffect(() => {
        setName(document?.name)
        setDescription(document?.description)
        setProd_period(document?.prod_period)
        setReplace_period(document?.replace_period)
        setNumber_length(document?.number_length)
        setImgURL(document?.image)
    }, [document]);

    const handleDeleteDocument = async () => {
        await dispatch(deleteDocument(id))
        navigate("/documents-table/")
    }

    if (!document) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="number" label="Срок изготовления" placeholder="Введите срок изготовления" value={prod_period} setValue={setProd_period}/>
                    <CustomInput type="number" label="Срок замены" placeholder="Введите срок замены" value={replace_period} setValue={setReplace_period}/>
                    <CustomInput type="number" label="Кол-во символов в номере (от 1 до 10)" placeholder="Введите кол-во символов" value={number_length} setValue={setNumber_length}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveDocument}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteDocument}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default DocumentEditPage