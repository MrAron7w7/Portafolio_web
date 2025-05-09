import bcrypt from "bcryptjs";

export async function compare(password: string, hash: string) {
    const isValid: boolean = await bcrypt.compare(password, hash);
    return isValid;
}

export async function hashPassword(password: string) {
    const hash: string = await bcrypt.hash(password, 10);
    return hash;
}