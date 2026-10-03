select u.nome as usuario, t.nome as trilha, q.titulo as questao, a.texto as alternativa, a.correta
from usuario u
join usuario_trilha ut on ut.usuario_id = u.id
join trilha t on t.id = ut.trilha_id
join questao q on q.trilha_id = t.id
join alternativa a on a.questao_id = q.id
order by u.nome, q.titulo, a.correta desc;