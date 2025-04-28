export const textMessages = {
    required: 'Kolom wajib diisi',
    invalid: 'Format tidak sesuai',
    tooShort: (min: number) => `Minimal ${min} karakter`,
    tooLong: (max: number) => `Maksimal ${max} karakter`,

    email: 'Email tidak valid',
    number: 'Hanya boleh angka',
    phone: 'Nomor telepon tidak valid',

    minValue: (min: number) => `Nilai minimal adalah ${min}`,
    maxValue: (max: number) => `Nilai maksimal adalah ${max}`,

    fileRequired: 'Silakan unggah file',
    fileType: 'Jenis file tidak didukung',
    fileSize: (maxMB: number) => `Ukuran file tidak boleh lebih dari ${maxMB}MB`,

    checkboxRequired: 'Harap centang terlebih dahulu',

    dateInvalid: 'Tanggal tidak valid',
    datePast: 'Tanggal tidak boleh sebelum hari ini',

    // Sign Up message
    emailTaken: 'Email sudah digunakan',
    wrongPassword: 'Kombinasi email/password salah',

    // ActionAccount
    signInSuccess: 'Akun berhasil login',
    logoutSuccess: 'Logout berhasil',
    createdAccount: 'Akun berhasil dibuat',
    deleteAccountByAdmin: 'Akun anda telah dihapus oleh admin',
    deleteAccountFailed: 'Akun anda gagal dihapus',
    deleteAccountSuccess: 'Akun anda berhasil dihapus',
    editedAccountSuccess: 'Data akun berhasil diubah',
    editedAccountFailedWrongPass: 'Data password gagal diubah, password lama salah.',
    editedAccountFailed: 'Data akun gagal diubah'
}

export const textAction = {
    edit: (text: 'isEmpty' | string, status: 'success' | 'failed') => {
        if (text === 'isEmpty') {
            return `Kolom wajib diisi`
        } else {
            return `Data ${text} ${status === 'success' ? 'berhasil' : 'gagal'} diubah`
        }
    },
    delete: (text: string) => `Apakah anda yakin ingin menghapus ${text} ?`
}
