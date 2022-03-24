import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('rentals')
class RentalEntity {
  @PrimaryColumn()
  id: string

  @Column()
  car_id: string

  @Column()
  user_id: string
  
  @Column({ default: Date.now() })
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  expected_return_date: Date

  @Column()
  total: number
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { RentalEntity }