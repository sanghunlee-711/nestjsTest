//보통은 entity에서 db모델을 만들어야함. 근데 여기서는 js 객체로 db를 대체할 것이기에 이렇게 진행함
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
