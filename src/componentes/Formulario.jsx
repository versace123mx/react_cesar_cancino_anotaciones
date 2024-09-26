import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import { Editor } from '@tinymce/tinymce-react'
import { addAnotaciones } from '../servicios/APIRest'

const Formulario = () => {

    const navigate = useNavigate()
    const [titulo, setTitulo] = useState('')
    const editorRef = useRef(null)
    const [show, setShow] = useState(false);

    /*para abrir o cerrar la ventana modal*/
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = async (e) => {
        if (titulo == '') {
            Swal.fire({
                icon: 'error',
                title: 'Ops',
                text: "El campo título es obligatorio"
            });
            return;
        }

        console.log(editorRef.current.getContent())
        /*con editorRef.current.getContent() obtenemos el valor del editor*/
        
        if (editorRef.current.getContent() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Ops',
                text: "El campo descripción es obligatorio"
            });
            return;
        }
        const result = await addAnotaciones({ titulo: titulo, descripcion: editorRef.current.getContent() });
        
        if(result.estado='ok'){
            Swal.fire({
                icon: 'success',
                title: 'OK',
                text: "Se creó el registro exitosamente"
            });
            
            setInterval(() => {
                navigate(0);
            },3000)
        }
        
    }
    return (
        <>
            <p>
                <button className='btn btn-warning' onClick={handleShow}>Crear Nota</button>
            </p>
            {/*se utiliza useState para el valor inicial en este caso show es false cuando cambia su estado se vuelve false o true para mostrar la
            ventana modal, de primera instancia show es false por es no se muestra el modal al carla la pagina
            */}
            <Modal show={show} onHide={handleClose} dialogClassName='modal-490w'>
                <Modal.Header closeButton>
                    <Modal.Title>Crear nueva anotacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group'>
                            <label htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                id='titulo'
                                className='form-control'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="descripcion">Descripcion</label>
                            {/*La clave de todo esto esta en onInit={(evt, editor) => editorRef.current = editor} ahi es donde obtenemos el valor del texarea*/}
                            <Editor
                                apiKey='dygfl6uuwytwrjyo234i0a5b7g4ia51lk6d4y2zky5dxsarg'
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                    plugins: [
                                        // Core editing features
                                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                        // Your account includes a free trial of TinyMCE premium features
                                        // Try the most popular premium features until Sep 23, 2024:
                                        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                }}
                                initialValue="Welcome to TinyMCE!"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Cerrar</Button>
                    <Button variant='primary' onClick={handleSubmit}>Enviar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Formulario
