import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import DocumentsListPage from "pages/DocumentsListPage/DocumentsListPage.tsx";
import DocumentPage from "pages/DocumentPage/DocumentPage.tsx";
import RequestsPage from "pages/RequestsPage/RequestsPage.tsx";
import RequestPage from "pages/RequestPage/RequestPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import DocumentsTablePage from "pages/DocumentsTablePage/DocumentsTablePage.tsx";
import DocumentEditPage from "pages/DocumentEditPage/DocumentEditPage.tsx";
import DocumentAddPage from "pages/DocumentAddPage/DocumentAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/documents/" element={<DocumentsListPage />} />
                        <Route path="/documents-table/" element={<DocumentsTablePage />} />
                        <Route path="/documents/:id/" element={<DocumentPage />} />
                        <Route path="/documents/:id/edit" element={<DocumentEditPage />} />
                        <Route path="/documents/add" element={<DocumentAddPage />} />
                        <Route path="/requests/" element={<RequestsPage />} />
                        <Route path="/requests/:id/" element={<RequestPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
