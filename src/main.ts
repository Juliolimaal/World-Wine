
import { Component } from '@angular/core';

interface Article {
  category: string;
  number: string;
  title: string;
  author: string;
  summary: string;
  image: string;
  imageAlt: string;
  layout: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly tickerItems = [
    'O Riesling continua mal compreendido',
    'Quatro dias a atravessar o Mosel',
    'Em defesa do vinho em caixa',
    'Uma sommelière na noite de folga',
    'Priorat sem o autocarro turístico'
  ];

  readonly stories: Article[] = [
    {
      category: 'Opinião',
      number: '014',
      title: 'Em defesa do vinho em caixa, por uma crítica que devia saber melhor.',
      author: 'Léa Chaumont',
      summary: 'Três litros de Grenache pelo preço de um cocktail. Não vou pedir desculpa.',
      image: 'https://images.unsplash.com/photo-1536392706976-e486e2ba97af?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mesa preparada para uma experiência gastronômica',
      layout: 'story-wide'
    },
    {
      category: 'Reportagem',
      number: '048',
      title: 'A adega é fria. O dono é mais frio.',
      author: 'Diogo Antunes',
      summary: 'Uma semana no Priorat com um produtor que não quer visitas — e faz questão de o dizer.',
      image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Garrafas de vinho armazenadas numa adega',
      layout: 'story-tall'
    },
    {
      category: 'Ensaio',
      number: '061',
      title: 'O vinho natural prometia acabar com os porteiros. Construiu uma cerca nova.',
      author: 'Sana Ortega',
      summary: 'O vinho é melhor. O público é mais ou menos o mesmo, só que agora veste linho.',
      image: 'https://images.pexels.com/photos/4070538/pexels-photo-4070538.jpeg?auto=compress&cs=tinysrgb&w=1200',
      imageAlt: 'Paisagem de vinhedos ao pôr do sol',
      layout: 'story-tall'
    },
    {
      category: 'Caderno de campo',
      number: '072',
      title: 'O que uma sommelière pede quando é ela a pagar.',
      author: 'Keiko Marsh',
      summary: 'Não está na carta. No bar onde trabalha, não é ela que paga a conta. Em casa, bebe outra coisa.',
      image: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Fileiras de videiras numa região produtora de vinho',
      layout: 'story-wide'
    }
  ];

  readonly cover = {
    titleLine1: 'Toda a gente',
    titleLine2: 'está outra vez errada',
    titleLine3: 'sobre o vinho.',
    description:
      'Uma viagem pelas regiões produtoras, pelas uvas esquecidas e pelas histórias que merecem ser contadas. Sem complicar aquilo que deve ser apreciado.',
    author: 'Marta Reis',
    photographer: 'J. Vermeer',
    image: 'https://images.unsplash.com/photo-1669711517916-9c0767aaa08b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Retrato editorial relacionado à cultura do vinho'
  };
}