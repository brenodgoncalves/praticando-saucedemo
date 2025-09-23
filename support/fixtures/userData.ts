export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    postalCode: string;
}

export const user: User = {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345678'
}
