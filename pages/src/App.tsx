import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import DocumentPage from "pages/DocumentPage/DocumentPage.tsx";
import DocumentsListPage from "pages/DocumentsListPage/DocumentsListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Document} from "modules/types.ts";

function App() {

    const [documents, setDocuments] = useState<T_Document[]>([])

    const [selectedDocument, setSelectedDocument] = useState<T_Document | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedDocument={selectedDocument}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/documents/" element={<DocumentsListPage documents={documents} setDocuments={setDocuments} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/documents/:id" element={<DocumentPage selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
