import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: any;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (type != 'income' && type != 'outcome') {
      throw new Error('Informe um type com os valores income ou outcome');
    }

    if (type == 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      const isExtrapolou = balance.total - value < 0;
      if (isExtrapolou) {
        throw new Error('Sem caixa para fazer essa retirada');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
