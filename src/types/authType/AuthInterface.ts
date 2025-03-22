export const inputMessage = {
    signUp: {
        username: {
            required: 'Username tidak boleh kosong.',
            min: 'Username tidak boleh kurang dari 2 huruf.',
            max: 'Username tidak boleh lebih dari 50 huruf.'
        },
        phone_number: {
            required: 'Nomor whatsapp tidak boleh kosong.',
            typeError: 'Nomor whatsapp hanya boleh berisi angka.',
            number: 'Nomor whatsapp harus menggunakan angka.'
        },
        email: {
            required: 'Email tidak boleh kosong.',
            email: 'Email harus menggunakan format yang benar.',
            min: 'Email tidak boleh kurang dari 4 huruf.',
            max: 'Email tidak boleh lebih dari 50 huruf.'
        },
        password: {
            required: 'Password tidak boleh kosong.',
            min: 'Password tidak boleh kurang dari 4 huruf.',
            max: 'Password tidak boleh lebih dari 50 huruf.'
        }
    }
}
