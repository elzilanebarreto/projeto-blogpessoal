import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogin {
  @ApiProperty()
  public usario: string;

  @ApiProperty()
  public senha: string;
}
