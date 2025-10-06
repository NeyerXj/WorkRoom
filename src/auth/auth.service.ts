import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordHasher } from './crypto/password-hasher.service';
import { SimpleJwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
    private readonly hasher: PasswordHasher,
    private readonly jwt: SimpleJwtService){}

    async register(email: string, password: string){
        const existing = await this.users.findOne({where:{
            email
        }})
        if(existing) throw new BadRequestException('Email already used');

        const user = await this.users.create({email, passwordHash: this.hasher.hash(password)})

        await this.users.save(user)

        return {id: user.id}
    }

    async login(email: string, password: string){
        const user = await this.users.findOne({where:{email}})
        if(!user || !this.hasher.verify(password, user.passwordHash)){
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.jwt.sign({sub: user.id, email: user.email})

        return accessToken
    }
}
