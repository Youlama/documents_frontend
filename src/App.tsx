import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import DocumentPage from "pages/DocumentPage";
import DocumentsListPage from "pages/DocumentsListPage";
import {Route, Routes} from "react-router-dom";
import {T_Document} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [documents, setDocuments] = useState<T_Document[]>([])

    const [selectedDocument, setSelectedDocument] = useState<T_Document | null>(null)

    const [isMock, setIsMock] = useState(false);

    const [documentName, setDocumentName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedDocument={selectedDocument} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/documents/" element={<DocumentsListPage documents={documents} setDocuments={setDocuments} isMock={isMock} setIsMock={setIsMock} documentName={documentName} setDocumentName={setDocumentName}/>} />
                        <Route path="/documents/:id" element={<DocumentPage selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
