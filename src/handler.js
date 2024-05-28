// Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes

const { nanoid } = require('nanoid');
const notes = require('./notes');

// post note
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}

// get all note
const getNoteHandler = (request, h) => ({
    status: 'succes',
    data: {
        notes
    }

})

// get detail note
const getDetailNoteHandler = (request, h) => {
    const { id } = request.params

    const note = notes.filter((note) => note.id === id)[0]

    if (note !== undefined) {

        return {
            status: 'success',
            data: {
                note
            }

        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    })

    response.code(404)
    return response
}

// update note
const updateNoteHandler = (request, h) => {
    const { id } = request.params


    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();


    // search the index
    const index = notes.findIndex((note) => note.id === id)

    // is index find
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        }

        const response = h.response({
            status: 'succes',
            message: 'Catatan berhasil di Update'
        })

        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fali',
        message: 'Catatan gagal diupdate'
    })

    response.code(404)
    return response



}

// delete note

const deleteNoteByIdHandler = (request, h) =>{
    
    const { id } = request.params

    const index = notes.findIndex((note) =>  note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)
        const response = h.response({
            status:'succes',
            message: 'Catatan berhasil di delete!'
        })

        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal di delete!'
    })

    response.code(404)
    return response
}



module.exports = { addNoteHandler, getNoteHandler, getDetailNoteHandler, updateNoteHandler, deleteNoteByIdHandler }

