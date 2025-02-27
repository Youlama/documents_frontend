import {Button, Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import React, {useEffect, useState} from "react";
import mock from "src/assets/mock.png"
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {createDocument} from "store/slices/documentsSlice.ts";
import {T_DocumentAddData} from "modules/types.ts";

const DocumentAddPage = () => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>()

    const [description, setDescription] = useState<string>()

    const [prod_period, setProd_period] = useState<number>()

    const [replace_period, setReplace_period] = useState<number>()

    const [number_length, setNumber_length] = useState<number>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const handleCreateDocument = async() => {
        if (!name || !description || !prod_period) {
            return
        }

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('prod_period', prod_period as string)
        formData.append('replace_period', replace_period as string)
        formData.append('number_length', number_length as string)

        if (imgFile != undefined) {
            formData.append('image', imgFile, imgFile.name)
        }

        await dispatch(createDocument(formData as T_DocumentAddData))

        navigate("/documents-table/")
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL as string} alt="" className="w-100"/>
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
                        <Button color="success" className="fs-4" onClick={handleCreateDocument}>Создать</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default DocumentAddPage