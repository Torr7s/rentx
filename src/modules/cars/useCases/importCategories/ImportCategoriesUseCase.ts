import fs from 'fs';
import csvParse from 'csv-parse';

import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/domain/repositories/CategoriesInterface';

interface IImportCarCategoryRequest {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private _repository: ICategoriesRepository
  ) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCarCategoryRequest[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCarCategoryRequest[] = []
      const stream = fs.createReadStream(file.path)

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line

          categories.push({
            name,
            description
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)

          resolve(categories)
        })
        .on('error', (err: Error) => reject(err))
    })
  }

  async perform(file: Express.Multer.File): Promise<void> {
    const categories: IImportCarCategoryRequest[] = await this.loadCategories(file)

    categories.forEach(async (category) => {
      const { name, description } = category

      const categoryData = await this._repository.findByName(name)

      if (!categoryData) {
        await this._repository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoriesUseCase }