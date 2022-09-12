import { Routes, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Header from "./components/features/Header/Header";
import Footer from './components/features/Footer/Footer';
import NotFound from './components/pages/NotFound/NotFound';
import NoRights from './components/pages/NoRights/NoRights';
import HomePage from './components/pages/HomePage/HomePage';
import About from './components/pages/About/About';
import PostAdd from './components/pages/PostAdd/PostAdd';
import PostEdit from './components/pages/PostEdit/PostEdit';
import PostSingle from './components/pages/PostSingle/PostSingle';
import AdminHome from './components/pages/AdminHome/AdminHome';
import UserEdit from './components/pages/UserEdit/UserEdit';
import UserAdd from './components/pages/UserAdd/UserAdd';

function App() {
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/add/" element={<PostAdd />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/view/:id" element={<PostSingle />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/edit/:id" element={<UserEdit />} />
          <Route path="/admin/add/" element={<UserAdd />} />
          <Route path="/admin/warning/" element={<NoRights />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;
