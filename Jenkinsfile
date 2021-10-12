pipeline {
        environment{
                DIR_LOJA = "/var/www/models-newsletter"
        }

        agent {
                node {
                        // Rotulo da maquina que ira executar o Pipeline
                        label 'newsletters'

                        // Espaco de trabalho personalizado 
                        customWorkspace '/home/newsletters/workspace'
                }
        }

        stages {
                // Para evitar conflitos, adicionaremos todos os arquivos modificados
                // na stash
                stage('Git Stash'){
                        steps {
                                script {
                                        try {
                                                sh 'git -C ${DIR_LOJA} add -A'
                                                sh 'git -C ${DIR_LOJA} stash'
                                        }
                                        catch (Exception e) {
                                                sh 'echo "Erro no Git Stash"'
                                        }
                                }
                        }
                }

                stage('Git pull') {
                        steps{
                                sh 'git -C ${DIR_LOJA} pull origin master'
                        }
                }

                // Reiniciando o serviço
                stage('Pm2 Reload'){
                        steps{
                                sh 'pm2 reload all'
                        }
                }
        }
}