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

    emailTaken: 'Email sudah digunakan',
    wrongPassword: 'Kombinasi email/password salah',

    dateInvalid: 'Tanggal tidak valid',
    datePast: 'Tanggal tidak boleh sebelum hari ini',

    checkboxRequired: 'Harap centang terlebih dahulu'
}
