import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Konyv } from './konyv';
import { UpdateKonyvDto } from './update-konyv.dto';
import { CreateKonyvDto } from './create-Konyv.Dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  konyvek: Konyv[] = [
    {
      id: 1,
      title: 'Az ember tragédiája',
      author: 'Madách Imre',
      isbn: '9789631180987',
      publishYear: 1861,
      reserved: true,
    },
    {
      id: 2,
      title: 'Egri csillagok',
      author: 'Gárdonyi Géza',
      isbn: '9789631185920',
      publishYear: 1899,
      reserved: false,
    },
    {
      id: 3,
      title: 'A Pál utcai fiúk',
      author: 'Molnár Ferenc',
      isbn: '9789631189201',
      publishYear: 1906,
      reserved: true,
    },
    {
      id: 4,
      title: 'A kőszívű ember fiai',
      author: 'Jókai Mór',
      isbn: '9789631180215',
      publishYear: 1869,
      reserved: false,
    },
    {
      id: 5,
      title: 'Tüskevár',
      author: 'Fekete István',
      isbn: '9789631183209',
      publishYear: 1957,
      reserved: true,
    },
  ]

  @Get ('books')
  konyvListazas() {
    return this.konyvek;
  }

  
  @Get ('sutik/:sutiid')
  @HttpCode(404)
  sutemenyIdAlapjan(@Param('konyvid') id: string) {
    const idSzam = parseInt(id);
    const konyv = this.konyvek.find(konyv => konyv.id == idSzam);
    if (!konyv) {
      throw new NotFoundException("Nincs ilyen id")
    }
    this.konyvek.splice(idx);
    return konyv;
  }

  @Delete('konyvek/:konyvid')
  @HttpCode(204)
  sutiTorles(@Param('konyvid') id: string) {
    const idSzam = parseInt(id);
  }

  
  @Post ('ujKonyv')
  @HttpCode(201)
  ujSuti(@Body() ujKonyvAdatok:CreateKonyvDto) {
    const ujKonyv: Konyv = {
      ...ujKonyvAdatok,
      id: this.nextID;
    }
    this.nextID++;
    this.konyvek.push(ujKonyv);
    return ujKonyv;
  }

  @Patch('konyvModositas:/konyvid')
  @HttpCode(200)
    konyvModositas(@Param('konyvid') id: string, @Body() konyvAdatok: UpdateKonyvDto) {
      const idSzam = parseInt(id);
      const eredetiKonyvID = this.konyvek.findIndex(konyv => konyv.id == idSzam);
      const eredetiKonyv = this.konyvek[eredetiKonyvID];
      const ujKonyv: Konyv  = {
        ...eredetiKonyv,
        ...konyvAdatok,
  };
  this.konyvek[eredetiKonyvID] = ujKonyv;
  return ujKonyv;
    }  

}
