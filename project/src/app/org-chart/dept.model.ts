export interface Dept {
  id: number;
  name: string;
  chief: number;
  chiefName: string;
  upId: number;
  upName: string;
  sub: Dept[];
}